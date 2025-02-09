
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Create a circle
        circle = Circle(radius=2, color=BLUE, stroke_width=4)

        # Draw the circle with a "Draw" animation
        self.play(Create(circle))
        
        # Scale the circle up to 1.5 times its original size
        self.play(circle.animate.scale(1.5))
        
        # Pulse effect for 2 seconds
        self.play(circle.animate.scale(1.2).scale(1/1.2), run_time=2, rate_func=there_and_back)
        
        # Keep the circle on the screen
        self.wait(1)
