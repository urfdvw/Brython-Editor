# The pi = 3.1415926
pi = 3.1415926
# Input the shape
shape = input("What is the shape, input \"circle\" or \"square\": ")
# If logic, to display different info in the next `input()`
if shape == "circle":
    measure = "radius"
elif shape == "square":
    measure = "edge"
else:
    # display error once shape not supported
    print(shape + " is not a supported shape.")
    exit()
# Input the length
length = float(input("What is length of the " + measure + ": "))
# If logic for different calculation equation
if shape == "circle":
    area = length ** 2 * pi
else:
    area = length ** 2
# display result
info = "The area of " + shape + " with " + measure + " equal to " + str(length) + " is " + str(area)
print(info)