
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create axes
        axes = Axes(
            x_range=[-3, 5, 1],
            y_range=[0, 0.5, 0.1],
            axis_config={"color": GRAY, "stroke_width": 1},  # Changed line_width to stroke_width
        )
        x_label = axes.get_x_axis_label("x")
        y_label = axes.get_y_axis_label("f(x)")

        # Create the normal distribution function
        def normal_distribution(x):
            return (1 / np.sqrt(2)) * np.exp(-((x - 1) ** 2) / 2)

        graph = axes.plot(normal_distribution, color=BLUE, stroke_width=2)

        # Create title and parameters
        title = Text("Normal Distribution Function", font_size=36, color=GOLD)
        parameters = Text("μ = 1, σ = 1", font_size=24, color=GOLD)

        # Positioning the title and parameters
        title.move_to(UP * 3)
        parameters.move_to(DOWN * 2)

        # Add axes and labels to the scene
        self.play(Create(axes), Write(x_label), Write(y_label))
        self.play(Create(graph))
        self.wait(1)

        # Fade in title and parameters
        self.play(FadeIn(title), run_time=1)
        self.play(FadeIn(parameters), run_time=1)
        self.wait(2)
