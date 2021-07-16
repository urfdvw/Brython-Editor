# The convertion ratio is 453.59237 grams = 1 pound
grams_per_pound = 453.59237
# Input prompt
weight_in_pounds = float(input("What is the weight in pounds:"))
# Math calculations: multiply
weight_in_grams = grams_per_pound * weight_in_pounds
# String operations: generate the output infomation string
information = "The weight is equal to " + str(weight_in_grams) + " grams."
# Display the output infomation
print(information)