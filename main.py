import time
import os
from data import data

start_time = time.time()
time_limit = 500
lives = 1
print("Proto aby jsi se mohl dostat z města budeš muset odpovědět pár otázek")

def print_hack_message(index):
    hack_message = [
        "Probíhá nabourání do první obraného štítu Řídícího centra",
        "Nabourávám...",
        "První štít překonán. Zahajuji překročení druhého štítu podezření: 0 %",
        "Nabourávám",
        "Bourání proběhlo neuspěšně. Zahajuji druhý pokus",
        "Nabourání úspěšné 2. obraný štít překonán",
        "Zahajuji proces vypnutí",
        "Nabourání do řídícího panelu",
        "Zkouším hesla...",
        "Panel byl hacknut, Vypínám řídící centrum\nVšechny systémy byly vypnuty zásadní indexy města byly schozeny na 0!"
    ]
    print(hack_message[index])

for index, question in enumerate(data):
    now_time = time.time() - start_time
    
    if now_time >= time_limit:
        print("Vypršel čas! Roboti tě chytili!")
        break
    
    print(question["text"])
    answer = input(f'{question["choses"]}: ')
    if question["answar"] == True or question["answar"] == False:
        answer = answer.capitalize()
        if answer == "True":
            answer = True

        elif answer == "False":
            answer = False
    else:
        answer = answer.lower()

        
    if answer == question["answar"]:
        print("To je správně")
    else:
        lives -= 1
        print(f"Toto není správná odpoved!\nMěj se na pozoru zbývá ti {lives} životy!")

    print("\n")
    print_hack_message(index=index)
    
    if lives == 0:
        print("Roboti tě našli a uvěznili. Prohrál jsi!")
        break
    
    print("\n\n\n")
    time.sleep(2)
    
if lives != 0:
    print("Gratuluji dokázel jsi hacknout celé město a deaktivoval jsi řídící Umělou inteligenci, nyní můžeš opustit město")
