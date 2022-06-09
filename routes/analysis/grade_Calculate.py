# 표준화->정규화->변환
# 표준정규분포의 100% =6x인 x를 찾아서 1등급은 0~x%까지, 2등급은 x~3x%까지, 3등급은 3x~6%로 지정

# get parameter from nodejs code
from pickletools import read_unicodestringnl
import sys
import scipy.stats as ss
import numpy as np
import sklearn.preprocessing as sk
import re
import pandas as pd

# 1
def z_score_normalization(sys):
    temp=re.findall(r'\d+', sys.argv[1])
    temp=list(map(int, temp))
    max=len(temp)
    
    rate_arr=[]
    for i in range (0, max):
        rate_arr.append(temp[i])

    rate_z_standardized=ss.zscore(rate_arr)
    return(rate_z_standardized)

# 2
def min_max_normalization(arr):
    scaler=sk.MinMaxScaler()
    df=pd.DataFrame(arr, columns=['a'])
    scaler.fit(df)
    temp=scaler.transform(df)
    temp=list(map(float, temp))
    return(temp)

# 3
def natural_log(arr):
    temp1=[]
    max=len(arr)
    temp2=[]
    for i in range(0, max):
        temp1.append(np.log1p(arr[i]))
    # mean=np.mean(temp1)
    # std=np.std(temp1)
    # for i in range(0, max):
    #     temp2.append((temp1[i]-mean)/std)
    return(list(map(float, ss.zscore(temp1))))


if __name__=='__main__':
    rate_z_standardized=z_score_normalization(sys)
    rate_mm_normalized=min_max_normalization(rate_z_standardized)
    rate_log=natural_log(rate_mm_normalized)
    print(rate_log)