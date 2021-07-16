# The convertion ratio is 453.59237 grams = 1 pound
grams_per_pound = 453.59237
# Input the original unit
original_unit = input("Which unit are you currently using? Please input \"pound\" or \"gram\": ")
# display error once unit not supported
if original_unit != "pound":
    if original_unit != "gram":
        print(original_unit + " is not a supported unit.")
        exit()
# Input the weight value
original_value = float(input("What is the weight in " + original_unit + "s: "))
# If logic for different calculation equation
if original_unit == "pound": # if the unit is "pound"
    # calculate the output value
    target_value = original_value * grams_per_pound
    # display the result
    print("The weight is equal to " + str(target_value) + " grams.")
else: # if the unit is "gram"
    # calculate the output value
    target_value = original_value / grams_per_pound
    # display the result
    print("The weight is equal to " + str(target_value) + " pounds.")