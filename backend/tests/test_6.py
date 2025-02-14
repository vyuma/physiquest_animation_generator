
from manim import *

# Define the colors
LIGHT_BLUE = "#00BFFF"  # You can choose any hex code for light blue
LIGHT_GREEN = "#90EE90"  # Define light green using a hex code

class GeneratedScene(Scene):
    def construct(self):
        # Set up the background
        self.camera.background_color = BLACK

        # Create the text
        text = Text("ジョイサウンドゥール", weight=BOLD, color=PURPLE_E).scale(2)
        text.set_color_by_gradient(BLUE, PURPLE)

        # Create the shapes
        circle = Circle( color=LIGHT_BLUE)
        square = Square(side_length=2, color=LIGHT_GREEN)  # Now LIGHT_GREEN is defined
        star = Star( color=YELLOW)  # Corrected line

        # Position the shapes
        square.move_to(LEFT * 3)
        star.move_to(ORIGIN)

        # Animations
        self.play(FadeIn(text))
        self.play(text.animate.shift(UP * 0.5).shift(DOWN * 0.5).shift(UP * 0.5).shift(DOWN * 0.5).shift(UP * 0.5).shift(DOWN * 0.5), run_time=2)

        self.play(circle.animate.scale(1.5).set_opacity(1), run_time=1)
        self.play(circle.animate.rotate(2 * PI).shift(UP * 0.5), run_time=3)

        self.play(square.animate.move_to(ORIGIN).shift(RIGHT * 1), run_time=1.5)
        self.play(square.animate.scale(1.1).shift(UP * 0.1).shift(DOWN * 0.1).shift(UP * 0.1).shift(DOWN * 0.1), run_time=2)

        self.play(FadeIn(star.rotate(2 * PI)), run_time=1)
        self.play(star.animate.set_opacity(0).set_opacity(1).set_opacity(0).set_opacity(1), run_time=3)

        # Hold positions before fading out
        self.wait(1)
        self.play(FadeOut(text), FadeOut(circle), FadeOut(square), FadeOut(star))
