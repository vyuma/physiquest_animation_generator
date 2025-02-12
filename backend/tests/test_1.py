
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create a red circle
        circle = Circle(radius=1, color=RED)
        
        # Animation 1: Draw the red circle
        self.play(Create(circle))
        
        # Animation 2: Scale the circle
        self.play(circle.animate.scale(1.5))
        
        # Animation 3: Fade out
        self.play(FadeOut(circle))
