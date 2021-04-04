import csv
import os
import pandas as pd

base = "./names/"
index = 0
d = {'name': [], 'sex': [], 'count':[], 'year':[], 'index':[]}
df = pd.DataFrame(data=d)
df.to_csv('./allnames.csv', mode='w', header=True, index = False)
count = 0
for filename in os.listdir(base):
    if filename.endswith(".txt"):
        if count > 2:
            break
        year = int(filename.split("yob")[1].split(".txt")[0])
        read_file = pd.read_csv(base+filename)
        read_file[str(year)] = year
        read_file[str(index)] = [i for i in range(index+1, index+len(read_file)+1)]
        read_file.to_csv('./allnames.csv', mode='a', header=True, index=False)
        index +=len(read_file) + 1
        print(index)
        count += 1
