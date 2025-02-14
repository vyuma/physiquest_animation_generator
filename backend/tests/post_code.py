from manim import *
import numpy as np

class FermiDistribution(Scene):
    def construct(self):
        # 定数
        Ef = 0  # フェルミエネルギー
        k = 1  # ボルツマン定数 (簡単のため1とする)
        T = 1  # 絶対温度

        # 関数定義
        def fermi(E):
            return 1 / (np.exp((E - Ef) / (k * T)) + 1)

        # グラフ作成
        axes = Axes(
            x_range=[-5, 5, 1],
            y_range=[0, 1.1, 0.1],
        )
        fermi_curve = axes.plot(fermi, x_range=[-5, 5], color=BLUE)

        # ラベル
        axes_labels = axes.get_axis_labels(
            x_label="E", y_label="f(E)"
        )

        # アニメーション
        self.play(Create(axes), Write(axes_labels))
        self.play(Create(fermi_curve))
        self.wait(1)

        # 温度変化のアニメーション例 (コメントアウトを外して試してください)
        T_values = np.linspace(0.1, 5, 50)
        for T in T_values:
            fermi_curve_new = axes.plot(lambda E: 1 / (np.exp((E - Ef) / (k * T)) + 1), x_range=[-5, 5], color=BLUE)
            self.play(Transform(fermi_curve, fermi_curve_new))
            self.wait(0.05)
        self.wait(1)