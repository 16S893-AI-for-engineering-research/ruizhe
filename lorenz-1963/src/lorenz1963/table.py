"""Compare the calculation with early values tabulated by Lorenz."""

from __future__ import annotations

import numpy as np

from .model import FIGURE_2_INITIAL_STATE, integrate

# Early trajectory values transcribed to the paper's three-decimal precision.
# They provide a regression check before chaotic error growth dominates.
TABLE_1 = np.array(
    [
        [0.0, 0.000, 1.000, 0.000],
        [0.1, 0.909, 2.088, 0.062],
        [0.2, 3.040, 6.607, 0.760],
        [0.3, 9.410, 19.275, 7.502],
        [0.4, 19.606, 23.422, 39.820],
        [0.5, 9.705, -6.744, 41.489],
        [0.6, -2.116, -8.965, 29.840],
        [0.7, -6.131, -8.361, 26.271],
        [0.8, -7.775, -9.113, 25.515],
        [0.9, -8.942, -9.871, 26.626],
        [1.0, -9.415, -9.345, 28.309],
    ]
)


def table_comparison() -> tuple[np.ndarray, np.ndarray]:
    """Return calculated states and calculated-minus-tabulated residuals."""

    _, states = integrate(FIGURE_2_INITIAL_STATE, t_end=1.0, step=0.01)
    indices = np.rint(TABLE_1[:, 0] / 0.01).astype(int)
    calculated = states[indices]
    return calculated, calculated - TABLE_1[:, 1:]


def main() -> None:
    calculated, residuals = table_comparison()
    print("  t       x_calc     y_calc     z_calc    max |calc − table|")
    print("  " + "−" * 58)
    for reference, state, residual in zip(TABLE_1, calculated, residuals, strict=True):
        print(
            f"{reference[0]:4.1f}  "
            f"{state[0]:10.6f} {state[1]:10.6f} {state[2]:10.6f}  "
            f"{np.max(np.abs(residual)):10.6f}"
        )


if __name__ == "__main__":
    main()
