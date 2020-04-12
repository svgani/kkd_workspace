import PyPDF2

pdfFileObj = open('/home/naveen/Documents/resume.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
print(pdfReader.numPages)
pageObj = pdfReader.getPage(0)
l=pageObj.extractText()
print(l)
print(type(l))

pdfFileObj.close()
