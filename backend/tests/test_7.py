
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create axes
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[0, 0.4, 0.1],
            axis_config={"color": GRAY},
        )
        
        # Create normal distribution curve without opacity argument
        normal_curve = axes.plot(lambda x: np.exp(-x**2 / 2) / np.sqrt(2 * np.pi), color=BLUE)
        normal_curve.set_opacity(0.5)  # Set opacity after creation
        
        # Create mean indicator
        mean_indicator = always_redraw(lambda: DashedLine(start=axes.c2p(0, 0), end=axes.c2p(0, 0.4), color=RED))
        
        # Create standard deviation indicators
        std_dev_left = always_redraw(lambda: DashedLine(start=axes.c2p(-1, 0), end=axes.c2p(-1, 0.4), color=GREEN))
        std_dev_right = always_redraw(lambda: DashedLine(start=axes.c2p(1, 0), end=axes.c2p(1, 0.4), color=GREEN))
        
        # Create text labels
        mean_label = MathTex(r"\\mu = 0").next_to(mean_indicator, RIGHT)
        std_dev_label_left = MathTex(r"\\sigma = 1").next_to(std_dev_left, LEFT)
        std_dev_label_right = MathTex(r"\\sigma = 1").next_to(std_dev_right, RIGHT)
        
        # Add axes to the scene
        self.play(Create(axes))
        
        # Draw the normal distribution curve
        self.play(Create(normal_curve))
        
        # Draw the mean indicator
        self.play(DrawBorderThenFill(mean_indicator))
        self.play(FadeIn(mean_label))
        
        # Draw the standard deviation indicators
        self.play(DrawBorderThenFill(std_dev_left))
        self.play(FadeIn(std_dev_label_left))
        self.play(DrawBorderThenFill(std_dev_right))
        self.play(FadeIn(std_dev_label_right))
        
        # Hold the final scene
        self.wait(3)
