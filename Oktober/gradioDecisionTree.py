# !pip install -q gradio scikit-learn

X = [
    [2, 50],
    [3, 60],
    [7, 70],
    [6, 85],
    [8, 95],
    [1, 40]
]

y = [0, 0, 1, 1, 1, 0]

from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(random_state=42)

model.fit(X, y)

print("Model berhasil dilatih")

import gradio as gr

def prediksi(jam_belajar, kehadiran):
    data = [[jam_belajar, kehadiran]]
    hasil = model.predict(data)

    if hasil[0] == 1:
        return "Mahasiswa diprediksi lulus"
    else:
        return "Mahasiswa diprediksi tidak lulus"

app = gr.Interface(
    fn=prediksi,
    inputs=[
        gr.Slider(
            minimum=0,
            maximum=24,
            step=1,
            label="Jam belajar"
        ),
        gr.Slider(
            minimum=0,
            maximum=100,
            step=1,
            label="Kehadiran"
        )
    ],
    outputs=gr.Textbox(label="Prediksi"),
    title="prediksi kelulusan mahasiswa",
    description="Aplikasi machine learning menggunakan gradio"
)

app.launch()