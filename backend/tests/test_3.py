
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create a red circle
        circle = Circle(radius=1, color=RED)
        
        # Draw the circle
        self.play(Create(circle))
        
        # Scale the circle
        self.play(circle.animate.scale(1.5))
        
        # Move the circle to the right
        self.play(circle.animate.move_to(RIGHT * 3))
        
        # Fade out the circle
        self.play(FadeOut(circle))
