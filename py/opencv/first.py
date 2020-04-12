import cv2

#face_cascade = cv2.CascadeClassifier('haarcascade_smile.xml')

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

img = cv2.imread('4.JPG')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.1 ,10)

for (x,y,w,h) in faces:
    cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,0))

cv2.imshow('img',gray)
cv2.imshow('img',img)
cv2.waitKey()
