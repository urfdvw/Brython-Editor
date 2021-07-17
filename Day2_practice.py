# The convertion ratio is 453.59237 grams = 1 pound
grams_per_pound = 453.59237
# Input the original unit
original_unit = input("Which unit are you currently using? Please input \"pound\" or \"gram\": ")
# if logic, decide the target unit
if original_unit == "pound":
    target_unit = "gram"
elif original_unit == "gram":
    target_unit = "pound"
else:
    print(original_unit + " is not a supported unit.")
    exit()
# Input the weight value
original_value = float(input("What is the weight in " + original_unit + "s: "))
# If logic for different calculation equation
if original_unit == "pound": # if the unit is "pound"
    # calculate the output value
    target_value = original_value * grams_per_pound
else: # if the unit is "gram"
    # calculate the output value
    target_value = original_value / grams_per_pound
# display the result
print(original_value,
     original_unit,
     "s are equal to",
     target_value,
     target_unit + "s")