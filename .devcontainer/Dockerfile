FROM ubuntu:latest

# 環境変数でタイムゾーン設定を自動化
ENV DEBIAN_FRONTEND=noninteractive

# curlをダウンロードする
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    software-properties-common \
    build-essential \
    curl \
    && add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update
# Pythonのインストール
RUN apt-get install -y --no-install-recommends \
    python3.11\
    python3.11-venv \
    python3.11-dev \
    python3-pip

# Python3 をデフォルトの `python` コマンドに設定
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1 && \
    update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1

# node_modulesのインストール
RUN apt install -y nodejs npm && npm install n -g \
    && n stable \
    && apt purge -y nodejs npm \
    && apt autoremove -y \
    && n stable


# manimコードを動かすために必要なライブラリをインストールする。
# latex環境のインストール
RUN apt update && apt upgrade -y && \
apt install -y wget
RUN apt-get update && apt-get install -y texlive texlive-latex-extra && apt-get clean
# ffmpegを入れる
RUN apt-get install -y xz-utils
RUN wget https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz \
    && tar xvf ./ffmpeg-git-amd64-static.tar.xz \
    && cp ./ffmpeg*amd64-static/ffmpeg /usr/local/bin/
RUN apt update
RUN apt install -y cmake pkg-config libcairo2-dev libgirepository1.0-dev build-essential libpangocairo-1.0-0 libpango1.0-dev libcairo2-dev xdg-utils


# キャッシュを削除してイメージサイズを小さくする。
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/

# gitのダウンロード
RUN apt-get update && apt-get install -y git


# ================================================
# 🟢 pnpm（モダンNodeパッケージマネージャ）の導入
# ================================================
RUN npm install -g corepack && corepack enable && \
    corepack prepare pnpm@latest --activate

# 確認（任意）
RUN node -v && pnpm -v

# ================================================
# 🐍 uv（Rust製の超高速Pythonパッケージマネージャ）
# ================================================
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.cargo/bin:$PATH"

