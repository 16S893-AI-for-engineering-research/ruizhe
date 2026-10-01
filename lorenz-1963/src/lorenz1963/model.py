"""Lorenz's three-variable convection model and historical integrator."""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from numpy.typing import ArrayLike, NDArray

State = NDArray[np.float64]


@dataclass(frozen=True)
class Parameters:
    """Parameters used for Lorenz's 1963 Figure 2."""

    sigma: float = 10.0
    rho: float = 28.0
    beta: float = 8.0 / 3.0


FIGURE_2_PARAMETERS = Parameters()
FIGURE_2_INITIAL_STATE = np.array([0.0, 1.0, 0.0])


def _state(value: ArrayLike) -> State:
    state = np.asarray(value, dtype=float)
    if state.shape != (3,):
        raise ValueError(f"state must have shape (3,), got {state.shape}")
    if not np.all(np.isfinite(state)):
        raise ValueError("state must contain only finite values")
    return state


def vector_field(state: ArrayLike, parameters: Parameters = FIGURE_2_PARAMETERS) -> State:
    """Evaluate (dx/dt, dy/dt, dz/dt) at *state*."""

    x, y, z = _state(state)
    return np.array(
        [
            parameters.sigma * (y - x),
            x * (parameters.rho - z) - y,
            x * y - parameters.beta * z,
        ]
    )


def heun_step(
    state: ArrayLike,
    step: float,
    parameters: Parameters = FIGURE_2_PARAMETERS,
) -> State:
    """Advance one step with the explicit trapezoidal predictor-corrector method."""

    if not np.isfinite(step) or step <= 0.0:
        raise ValueError("step must be finite and positive")
    current = _state(state)
    slope = vector_field(current, parameters)
    predicted = current + step * slope
    return current + 0.5 * step * (slope + vector_field(predicted, parameters))


def integrate(
    initial_state: ArrayLike,
    t_end: float,
    step: float = 0.01,
    parameters: Parameters = FIGURE_2_PARAMETERS,
) -> tuple[State, NDArray[np.float64]]:
    """Integrate from t=0 through *t_end*, including both endpoints.

    ``t_end`` must be an integer multiple of ``step``. This avoids silently
    introducing a shorter final step into the historical fixed-step calculation.
    """

    if not np.isfinite(t_end) or t_end < 0.0:
        raise ValueError("t_end must be finite and non-negative")
    if not np.isfinite(step) or step <= 0.0:
        raise ValueError("step must be finite and positive")

    n_steps = round(t_end / step)
    if not np.isclose(n_steps * step, t_end, rtol=0.0, atol=1e-12):
        raise ValueError("t_end must be an integer multiple of step")

    times = np.arange(n_steps + 1, dtype=float) * step
    states = np.empty((n_steps + 1, 3), dtype=float)
    states[0] = _state(initial_state)
    for index in range(n_steps):
        states[index + 1] = heun_step(states[index], step, parameters)
    return times, states


def figure_2_trajectory() -> tuple[State, NDArray[np.float64]]:
    """Return the complete 1,900-step calculation used to draw Figure 2."""

    return integrate(FIGURE_2_INITIAL_STATE, t_end=19.0, step=0.01)
