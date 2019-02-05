# def compare_string(str, saved):
#     curr = ''
#     i = j = index = 0
#     for unused in range(0, len(str)):
#         if str[index] == saved[i]:
#             i += 1
#             index += 1
#             if i >= len(saved) - 1 or index >= len(str) - 1:
#                 return saved
#             elif str[index + 1] == ' ':
#                 curr = str[j:index + 1]
#                 index += 1
#                 i += 1
#         elif curr != '':
#             return curr
#         else:
#             i = 0
#             j += 1
#             index = j
#
#     return None

# def compare_string(string_to_check, saved_value):
#     if saved_value in string_to_check:
#         return saved_value
#     return None

# def compare_string(str, saved):
#     curr = ''
#     i = j = index = 0
#     for unused in range(0, len(str)):
#         if curr == saved:
#             return curr
#         if i >= len(saved) or index >= len(str):
#             if curr == saved:
#                 return curr
#             else:
#                 return None
#         elif str[index] == saved[i]:
#             # if len(curr) > 0:
#             #     if curr[-1] == ' ' and saved[i] == ' ':
#             #         asdf = 0
#             #     else:
#             #         curr += saved[i]
#             # else:
#             if i <= len(curr):
#                 if curr[i] !=saved[i]:
#                     curr += saved[i]
#
#             if index + 1 < len(str):
#                 if str[index + 1] == ' ':
#                     curr += str[index + 1]
#                     curr += str[index + 2]
#                     index += 1
#                     i += 1
#                     print(curr)
#             i += 1
#             index += 1
#         else:
#             i = 0
#             j += 1
#             index = j
#
#     return None

def compare_string(str, saved):
    curr = ''
    i = j = index = 0
    while j < len(str):
        print(curr)
        if curr == saved:
            return curr
        elif i >= len(saved) or index >= len(str):
            # paranoia check required ?
            return None
        elif str[index] == saved[i]:
            if len(curr) >= 2:
                if curr[-2] == ' ' and curr [-1] == saved[i]:
                    index += 1
                    i += 1
                    continue
            if index + 1 < len(str):
                if str[index + 1] == ' ':
                    curr += str[index]
                    curr += str[index + 1]
                    curr += str[index + 2]
                    index += 2
                    i += 2
                    continue
            curr += saved[i]
            index += 1
            i += 1
        else:
            i = 0
            j += 1
            index = j



print(compare_string('fresh olive oil virgin', 'olive oil'))
print('test' == 'test ')
