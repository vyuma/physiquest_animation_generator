
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create axes
        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[-30, 30, 10],
            axis_config={"color": GREY},
        )

        # Create the graph of the function y = x^3
        graph = axes.plot(lambda x: x**3, color=BLUE, stroke_width=2)

        # Create labels for the axes
        x_label = axes.get_x_axis_label("x")
        y_label = axes.get_y_axis_label("y")

        # Create the function label
        function_label = MathTex("y = x^3", color=RED).scale(1).next_to(graph, UP)

        # Add axes to the scene
        self.play(Create(axes), run_time=2)
        self.play(Create(graph), run_time=3)

        # Add labels to the scene
        self.play(FadeIn(x_label), FadeIn(y_label), run_time=1)

        # Add function label to the scene
        self.play(function_label.animate.shift(UP * 2), run_time=1)

        # Hold the final scene
        self.wait(2)
