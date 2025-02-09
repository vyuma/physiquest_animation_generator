
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create a circle
        circle = Circle(radius=2, color=BLUE, fill_opacity=0, stroke_width=4)
        
        # Draw the circle
        self.play(DrawBorderThenFill(circle))
        
        # Pulse animation
        self.play(circle.animate.scale(1.1), run_time=0.5)
        self.play(circle.animate.scale(0.9), run_time=0.5)
        self.play(circle.animate.scale(1.1), run_time=0.5)
        self.play(circle.animate.scale(0.9), run_time=0.5)
        
        # Hold the pulsing effect
        self.wait(2)
        
        # Fade out the circle
        self.play(FadeOut(circle))
