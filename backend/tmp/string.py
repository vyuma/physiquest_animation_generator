
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # 1. Introduction: Display the coordinate axes and the parabolic curve
        axes = Axes(
            x_range=[-1, 4, 1],
            y_range=[-1, 10, 2],
            axis_config={"color": BLUE},
        ).add_coordinates()
        
        # Define the function for the curve
        def func(x):
            return x**2
            
        curve = axes.plot(func, color=YELLOW, x_range=[-0.5, 3])
        curve_label = axes.get_graph_label(curve, label=r"y = x^2")

        self.play(Create(axes), Create(curve), Write(curve_label))
        self.wait(1)

        # 2. Points and Secant: Introduce points A and B and the secant line
        # Define the x-coordinates for points A and B
        x_a = 1.0
        x_b_initial = 2.5
        
        # Use a ValueTracker for the x-coordinate of point B to animate it later
        x_b_tracker = ValueTracker(x_b_initial)

        # Create Dot A (static)
        dot_a = Dot(point=axes.c2p(x_a, func(x_a)), color=WHITE)
        label_a = MathTex("A").next_to(dot_a, UR, buff=0.1)

        # Create Dot B (dynamic, will move along the curve)
        dot_b = always_redraw(
            lambda: Dot(point=axes.c2p(x_b_tracker.get_value(), func(x_b_tracker.get_value())), color=WHITE)
        )
        label_b = always_redraw(
            lambda: MathTex("B").next_to(dot_b, UR, buff=0.1)
        )

        # Create the secant line (dynamic, connects A and B)
        secant_line = always_redraw(
            lambda: DashedLine(
                dot_a.get_center(),
                dot_b.get_center(),
                color=RED,
            )
        )

        self.play(
            Create(dot_a),
            Write(label_a),
            Create(dot_b),
            Write(label_b)
        )
        self.play(Create(secant_line))
        self.wait(1)

        # 3. Approach and Transformation: Animate B moving towards A
        
        # Define the final tangent line
        # Slope of the tangent at x=a for y=x^2 is 2a
        slope_at_a = 2 * x_a
        tangent_line = Line(
            axes.c2p(x_a - 1.5, func(x_a) - 1.5 * slope_at_a),
            axes.c2p(x_a + 1.5, func(x_a) + 1.5 * slope_at_a),
            color=BLUE,
            stroke_width=4
        )

        # Animate the x-coordinate of B approaching A's x-coordinate
        # The always_redraw functions will update the positions of B and the secant line
        self.play(
            x_b_tracker.animate.set_value(x_a + 0.0001), # Animate very close to A
            run_time=3
        )
        self.wait(0.5)

        # Stop the secant line from updating so we can transform it
        secant_line.clear_updaters()

        # Transform the secant line into the tangent line
        # This will smoothly change its color from RED to BLUE and style from dashed to solid
        self.play(Transform(secant_line, tangent_line))
        self.wait(1)

        # 4. Conclusion: Display the derivative formula
        derivative_formula = MathTex("2x", font_size=60, color=GREEN)
        derivative_formula.next_to(axes, DOWN, buff=0.5)
        
        self.play(Write(derivative_formula))
        self.wait(2)
