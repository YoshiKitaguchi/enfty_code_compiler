import random 

A = []  # define a empty array 
rows = random.randint(10, 20) 
cols = random.randint(10, 20)
for i in range(rows):
    B = []
    for j in range(cols):
        B.append(i * random.randint(1, 10) + random.choice([-1, 1] * random.randint(1, 10)))
    A.append(B)

C = np.array(A)
print(C)