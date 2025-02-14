
from manim import *
class GeneratedScene(Scene):
    def construct(self):
        # Head
        head = Circle(radius=1.0, color=LIGHT_BROWN, fill_opacity=1)
        self.play(DrawBorderThenFill(head))

        # Body
        body = Ellipse(width=2.0, height=1.5, color=LIGHT_BROWN, fill_opacity=1).shift(DOWN * 1.0)
        self.play(DrawBorderThenFill(body))

        # Ears
        ear_right = Triangle(color=LIGHT_BROWN, fill_opacity=1).scale(0.3).rotate(PI/3).move_to(head.get_top() + RIGHT * 0.5)
        ear_left = Triangle(color=LIGHT_BROWN, fill_opacity=1).scale(0.3).rotate(-PI/3).move_to(head.get_top() + LEFT * 0.5)
        self.play(DrawBorderThenFill(ear_right), DrawBorderThenFill(ear_left))

        # Eyes
        eye_right = Circle(radius=0.1, color=GREEN_B, fill_opacity=1).move_to(head.get_center() + UP * 0.2 + RIGHT * 0.3)
        eye_left = Circle(radius=0.1, color=GREEN_B, fill_opacity=1).move_to(head.get_center() + UP * 0.2 + LEFT * 0.3)
        self.play(DrawBorderThenFill(eye_right), DrawBorderThenFill(eye_left))

        # Nose
        nose = Triangle(color=PINK, fill_opacity=1).scale(0.1).rotate(PI).move_to(head.get_center() + DOWN * 0.2)
        self.play(DrawBorderThenFill(nose))

        # Whiskers
        whiskers_right = VGroup(
            Line(nose.get_right(), nose.get_right() + RIGHT * 0.5 + UP * 0.2, color=DARK_GREY),
            Line(nose.get_right(), nose.get_right() + RIGHT * 0.5, color=DARK_GREY),
            Line(nose.get_right(), nose.get_right() + RIGHT * 0.5 + DOWN * 0.2, color=DARK_GREY)
        )
        whiskers_left = VGroup(
            Line(nose.get_left(), nose.get_left() + LEFT * 0.5 + UP * 0.2, color=DARK_GREY),
            Line(nose.get_left(), nose.get_left() + LEFT * 0.5, color=DARK_GREY),
            Line(nose.get_left(), nose.get_left() + LEFT * 0.5 + DOWN * 0.2, color=DARK_GREY)
        )
        self.play(Create(whiskers_right), Create(whiskers_left))

        # Tail
        tail_start = body.get_bottom() + DOWN * 0.1 + RIGHT * 0.7
        tail_end = tail_start + DOWN * 0.7 + RIGHT * 0.5
        tail = CurvedArrow(tail_start, tail_end, color=LIGHT_BROWN)
        self.play(Create(tail))

        # Text
        text_cat = Text("猫", color=BLUE).scale(1.0).move_to(body.get_bottom() + DOWN * 1.0)
        self.play(Write(text_cat))

        self.wait(2)
