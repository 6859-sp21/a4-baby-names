import csv
import os
import pandas as pd

base = "../names/"
index = 0
d = {'name': [], 'sex': [], 'count':[], 'year':[], 'rank':[], 'index':[]}
df = pd.DataFrame(data=d)
df.to_csv('./allnames.csv', mode='w', header=True, index = False)

for filename in os.listdir(base):
    if filename.endswith(".txt"):
        year = int(filename.split("yob")[1].split(".txt")[0])
        read_file = pd.read_csv(base+filename, header=None, names = ['name', 'sex', 'count'])
        read_file = read_file.sort_values(by=['count'], ascending=False)
        read_file[str(year)] = year
        read_file['rank'] = [i for i in range(0, len(read_file))]
        read_file[str(index)] = [i for i in range(index, index+len(read_file))]
        read_file.to_csv('./allnames.csv', mode='a',header=False, index=False)
        index +=len(read_file) + 1
