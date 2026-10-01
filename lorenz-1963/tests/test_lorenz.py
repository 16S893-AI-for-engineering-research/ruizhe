import math

import numpy as np
import pytest

from lorenz1963.model import (
    FIGURE_2_INITIAL_STATE,
    FIGURE_2_PARAMETERS,
    figure_2_trajectory,
    integrate,
    vector_field,
)
from lorenz1963.table import TABLE_1, table_comparison


def test_vector_field_vanishes_at_all_three_equilibria() -> None:
    amplitude = math.sqrt(FIGURE_2_PARAMETERS.beta * (FIGURE_2_PARAMETERS.rho - 1.0))
    equilibria = (
        np.array([0.0, 0.0, 0.0]),
        np.array([amplitude, amplitude, FIGURE_2_PARAMETERS.rho - 1.0]),
        np.array([-amplitude, -amplitude, FIGURE_2_PARAMETERS.rho - 1.0]),
    )

    for equilibrium in equilibria:
        np.testing.assert_allclose(vector_field(equilibrium), 0.0, atol=2e-14)

    assert np.sign(equilibria[1][0]) == np.sign(equilibria[1][1])
    assert np.sign(equilibria[2][0]) == np.sign(equilibria[2][1])


def test_vector_field_respects_half_turn_symmetry() -> None:
    state = np.array([2.75, -4.5, 31.0])
    symmetry = np.array([-1.0, -1.0, 1.0])

    np.testing.assert_allclose(
        vector_field(symmetry * state),
        symmetry * vector_field(state),
        rtol=0.0,
        atol=1e-14,
    )


def test_invariant_z_axis_tracks_known_exponential_solution() -> None:
    z_initial = 3.0
    times, states = integrate([0.0, 0.0, z_initial], t_end=0.8, step=0.01)
    exact_z = z_initial * np.exp(-FIGURE_2_PARAMETERS.beta * times)

    np.testing.assert_array_equal(states[:, :2], 0.0)
    assert np.max(np.abs(states[:, 2] - exact_z)) < 1.4e-4


def test_halving_step_reduces_short_time_global_error_by_about_four() -> None:
    z_initial = 3.0
    exact = z_initial * math.exp(-FIGURE_2_PARAMETERS.beta * 0.8)
    errors = []
    for step in (0.08, 0.04, 0.02):
        _, states = integrate([0.0, 0.0, z_initial], t_end=0.8, step=step)
        errors.append(abs(states[-1, 2] - exact))

    ratios = np.asarray(errors[:-1]) / np.asarray(errors[1:])
    assert np.all((3.5 < ratios) & (ratios < 4.8)), ratios


def test_early_values_match_table_1_to_printed_precision() -> None:
    _, residuals = table_comparison()
    assert np.max(np.abs(residuals)) <= 0.0005
    assert TABLE_1.shape == (11, 4)


def test_figure_2_uses_exactly_1900_steps_and_preserves_initial_state() -> None:
    times, states = figure_2_trajectory()

    assert len(times) == 1901
    assert times[1400] == pytest.approx(14.0)
    assert times[-1] == pytest.approx(19.0)
    np.testing.assert_array_equal(states[0], FIGURE_2_INITIAL_STATE)
