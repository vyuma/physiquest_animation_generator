
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Introduction: Start with a blank screen
        self.wait(1)

        # Circle Creation: Create a red circle
        circle = Circle(radius=1, color=RED)
        self.play(Create(circle))

        # Scaling: Scale the circle up to 1.5 times its size
        self.play(circle.animate.scale(1.5))

        # Movement: Move the circle smoothly to the right side of the screen
        self.play(circle.animate.shift(RIGHT * 3))

        # Conclusion: Fade out the circle
        self.play(FadeOut(circle))
