import re

#  open input.txt and read all the lines
digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
reversed_digits = ['eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin']
sum = 0
with open('input.txt') as f:
    lines = [line.strip() for line in f.readlines()]

for line in lines:
    # find the first and last digit and each lien and add them up (they could be words line 'one' or 1 too)
    first = re.findall(f'\d|one|two|three|four|five|six|seven|eight|nine', line)[0]
    last = re.findall(f'\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin', line[::-1])[0]

    # if the first or last digit is a word, convert it to a number
    if first in digits:
        first = digits.index(first) + 1
    if last in reversed_digits:
        last = reversed_digits.index(last) + 1
    
    print(f'first: {first}, last: {last}')
    
    
    sum += int(first) * 10 + int(last)
print(sum)
    
