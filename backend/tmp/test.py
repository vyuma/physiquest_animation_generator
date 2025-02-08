
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create a blue circle
        circle = Circle(radius=2, color=BLUE, stroke_width=4, fill_color=LIGHT_BLUE, fill_opacity=0.5)
        
        # Draw the circle
        self.play(Create(circle))
        
        # Scale the circle up
        self.play(circle.animate.scale(1.5))
        
        # Rotate the circle
        self.play(circle.animate.rotate(TAU))
        
        # Fade out the circle
        self.play(FadeOut(circle))
