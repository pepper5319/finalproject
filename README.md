# Final Project

##Using Backend
You don't have to do the whole thing each time you start modifying `backend/`, just Steps 3, 6-8
1. Make sure pip is pointing to python 3 (At least 3.7)
```
$ pip --version
pip 18.1 from /Users/user/anaconda3/lib/python3.7/site-packages/pip (python 3.7)
                                              ^^^^^^^^^ -- Look for this
```
2. Install virtualenv
```
$ pip install --upgrade virtualenv
Collecting virtualenv
Installing collected packages: virtualenv
Successfully installed virtualenv-16.1.0
```
3. Activate virtual enviornment
```
$ source env/bin/activate
(env) MyMacbook:backend user$
^^^^^ This should be here
```
4. Make sure pip is pointing to python 3 in virtualenv
```
$ pip --version
pip 18.1 from /Users/pepper5319/Desktop/Final Project/backend/env/lib/python3.7/site-packages/pip (python 3.7)
                                                                      ^^^^^^^^^ -- Look for this
```
5. Check Python Version
```
$ python --version
Python 3.7.0
```
6. cd into new finalproject
```
$ cd finalproject/
(env) MyMacbook:finalproject user$
```
7. Install files in requirements.txt (should be done after each `git pull`)
```
$ pip install - requirements.txt
```
8. Start working...
