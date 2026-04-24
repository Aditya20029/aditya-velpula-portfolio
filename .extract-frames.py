import imageio.v3 as iio
import os
import sys

src = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\Aditya\Downloads\Recording 2026-04-24 104931.mp4"
out_dir = r"C:\Users\Aditya\aditya-velpula-portfolio\.reel-frames"
os.makedirs(out_dir, exist_ok=True)

frames = []
for f in iio.imiter(src):
    frames.append(f)
n = len(frames)
print(f"total frames = {n}")

# 12 evenly spaced frames
picks = [int(n * p) for p in (0.02, 0.12, 0.22, 0.32, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9, 0.97)]
for i, idx in enumerate(picks):
    if idx >= n:
        idx = n - 1
    path = os.path.join(out_dir, f"r{i:02d}.jpg")
    iio.imwrite(path, frames[idx], quality=80)
    print(f"wrote r{i:02d} from frame {idx} shape {frames[idx].shape}")
