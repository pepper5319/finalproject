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
#
# def compare_string(string_to_check, saved_value):
#     if saved_value in string_to_check:
#         return saved_value
#     return None
#
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
#
# def compare_string(str, saved):
#     curr = ''
#     i = j = index = 0
#     while j < len(str):
#         print(curr)
#         if curr == saved:
#             return curr
#         elif i >= len(saved) or index >= len(str):
#             # paranoia check required ?
#             return None
#         elif str[index] == saved[i]:
#             if len(curr) >= 2:
#                 if curr[-2] == ' ' and curr [-1] == saved[i]:
#                     index += 1
#                     i += 1
#                     continue
#             if index + 1 < len(str):
#                 if i + 1 < len(saved):
#                     if str[index + 1] == ' ' and saved[i + 1] == ' ':
#                         curr += str[index]
#                         curr += str[index + 1]
#                         curr += str[index + 2]
#                         index += 2
#                         i += 2
#                         continue
#                 else:
#                     i = 0
#                     j += 1
#                     index = j
#                     continue
#             curr += saved[i]
#             index += 1
#             i += 1
#         else:
#             i = 0
#             j += 1
#             index = j
#             curr = ''
#     return(None)
#
# def compare_string(str, saved):
#     str_arr = str.split()
#     saved_arr = saved.split()
#
#
#     return(None)
#
#
#
# print(compare_string('fresh olive oil virgin', 'olive oil'))

def search_dict(input_dict, search_term):
    '''Searches for ingredient from search_term in dictionary'''
    ret_str = ''
    search_split = search_term.split()
    str_index = 0
    while str_index < len(search_split):
        # if str_index >= len(search_split):
        #     return None
        ret_str = ''
        if search_split[str_index] in input_dict.keys():
            ret_str += search_split[str_index]
            next_index = str_index + 1
            if next_index >= len(search_split):
                return ret_str.strip()
            if search_split[next_index] in input_dict[search_split[str_index]]:
                ret_str += ' ' + search_split[next_index]
                dict_index = next_index
                next_index += 1
                if next_index >= len(search_split):
                    return ret_str.strip()
                if search_split[next_index] in input_dict[search_split[dict_index]]:
                    ret_str += ' ' + search_split[next_index]

                return ret_str.strip()
            return ret_str.strip()
        else:
            str_index += 1

    return None
