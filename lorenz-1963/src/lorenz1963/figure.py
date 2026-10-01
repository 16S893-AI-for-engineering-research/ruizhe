"""Generate the two phase-space projections in Lorenz (1963), Figure 2."""

from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.axes import Axes

from .model import figure_2_trajectory

PLOT_START = 14.0
PLOT_END = 19.0


def _historical_axes(axis: Axes, xlabel: str, ylabel: str, panel: str) -> None:
    axis.set_xlabel(xlabel, labelpad=7)
    axis.set_ylabel(ylabel, rotation=0, labelpad=11)
    axis.set_title(panel, loc="left", pad=13, fontsize=10, fontweight="bold")
    axis.tick_params(direction="in", top=True, right=True, width=0.75, length=4)
    for spine in axis.spines.values():
        spine.set_linewidth(0.75)
    axis.grid(False)


def _label_times(axis: Axes, horizontal: np.ndarray, vertical: np.ndarray) -> None:
    offsets = {
        14: (5, 5),
        15: (5, -10),
        16: (5, 5),
        17: (5, 5),
        18: (5, -10),
        19: (5, 5),
    }
    for time in range(14, 20):
        index = round((time - PLOT_START) / 0.01)
        axis.plot(horizontal[index], vertical[index], ".", color="black", ms=3.5)
        axis.annotate(
            str(time),
            (horizontal[index], vertical[index]),
            xytext=offsets[time],
            textcoords="offset points",
            fontsize=7.5,
        )


def make_figure() -> plt.Figure:
    """Build the Figure 2 reproduction and return its Matplotlib figure."""

    times, states = figure_2_trajectory()
    mask = (times >= PLOT_START) & (times <= PLOT_END)
    segment = states[mask]
    x, y, z = segment.T

    plt.rcParams.update(
        {
            "font.family": "serif",
            "font.serif": ["Times New Roman", "Times", "DejaVu Serif"],
            "font.size": 9,
            "axes.linewidth": 0.75,
        }
    )
    figure, (xy_axis, yz_axis) = plt.subplots(1, 2, figsize=(10.2, 5.35))
    figure.subplots_adjust(left=0.08, right=0.975, bottom=0.17, top=0.82, wspace=0.24)

    line_style = {"color": "black", "linewidth": 0.72, "solid_capstyle": "round"}
    xy_axis.plot(x, y, **line_style)
    yz_axis.plot(y, z, **line_style)

    _label_times(xy_axis, x, y)
    _label_times(yz_axis, y, z)
    _historical_axes(xy_axis, r"$x$", r"$y$", "A   PROJECTION ON THE x–y PLANE")
    _historical_axes(yz_axis, r"$y$", r"$z$", "B   PROJECTION ON THE y–z PLANE")

    xy_axis.set_xlim(-20, 20)
    xy_axis.set_ylim(-25, 25)
    xy_axis.set_xticks(np.arange(-20, 21, 10))
    xy_axis.set_yticks(np.arange(-20, 21, 10))
    yz_axis.set_xlim(-25, 25)
    yz_axis.set_ylim(0, 50)
    yz_axis.set_xticks(np.arange(-20, 21, 10))
    yz_axis.set_yticks(np.arange(0, 51, 10))

    figure.suptitle(
        "PHASE-SPACE TRAJECTORY,  t = 14–19",
        y=0.92,
        fontsize=13,
        fontweight="bold",
    )
    figure.text(
        0.5,
        0.055,
        "Lorenz system  ·  σ = 10,  ρ = 28,  β = 8/3  ·  Heun predictor–corrector,  h = 0.01\n"
        "Initial state (0, 1, 0); numerals mark integral values of time.",
        ha="center",
        va="bottom",
        fontsize=8,
        linespacing=1.55,
    )
    return figure


def save_figure(output: Path, dpi: int = 240) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    figure = make_figure()
    figure.savefig(output, dpi=dpi, facecolor="white")
    plt.close(figure)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("figures/lorenz_figure_2.png"),
        help="output path; extension controls the format",
    )
    parser.add_argument("--dpi", type=int, default=240, help="resolution for raster output")
    arguments = parser.parse_args()
    save_figure(arguments.output, arguments.dpi)
    print(f"Wrote {arguments.output}")


if __name__ == "__main__":
    main()
