
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Introduction
        intro_text = Text("Fermi Distribution Function", font_size=0.5)
        self.play(Write(intro_text))
        self.wait(1)
        self.clear()

        # Draw Axes
        axes = Axes(x_range=(-1, 1, 0.5), y_range=(0, 1, 0.2), axis_config={"color": BLUE})
        self.play(Create(axes))

        # Initial Graph at T = 0 K
        def fermi_distribution(x, T):
            return 1 / (np.exp(x / T) + 1) if T > 0 else 1 if x < 0 else 0

        graph = axes.plot(lambda x: fermi_distribution(x, 0), color=BLUE)
        self.play(Create(graph))

        # Display Temperature Indicator
        temperature_text = Text("Temperature: T = 0 K", font_size=0.5, color=RED).to_edge(UP + RIGHT)
        self.play(FadeIn(temperature_text))

        # Temperature Variation
        for T in [0, 100, 200, 300]:
            new_graph = axes.plot(lambda x: fermi_distribution(x, T), color=BLUE)
            self.play(Transform(graph, new_graph))
            self.play(Write(temperature_text))
            temperature_text.become(Text(f"Temperature: T = {T} K", font_size=0.5, color=RED).to_edge(UP + RIGHT))
            self.wait(1)

        # Final Display with Legend
        legend_text = Text("Fermi Distribution Function", font_size=0.4, color=GREEN).to_edge(DOWN + LEFT)
        self.play(FadeIn(legend_text))
        self.wait(2)
