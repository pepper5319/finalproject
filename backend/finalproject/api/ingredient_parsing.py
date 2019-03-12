def search_dict(input_dict, search_term):
    '''Searches for ingredient from search_term in dictionary'''
    dont_include_list = ['and', 'whole', 'condensed', 'hot', 'cold', 'delicious', 'food',
                         'liquid', 'italian', 'chinese', 'dried', 'potato', 'white', 'yellow',
                         'black', 'green', 'sweet', 'seasoning']
    str_list = []
    build_str = ''
    search_split = search_term.split()
    str_index = 0
    str_len = len(search_split)
    while str_index < str_len:
        build_str = ''
        if search_split[str_index] in input_dict.keys():
            build_str += search_split[str_index]
            str_key = str_index
            str_val = str_key + 1

            while (str_key < str_len):
                if str_val < str_len:
                    if search_split[str_key] in input_dict.keys():
                        if search_split[str_val] in input_dict[search_split[str_key]]:
                            build_str += ' ' + search_split[str_val]
                            str_key += 1
                            str_val += 1
                        else:
                            break
                    else:
                        break
                else:
                    break

            if build_str not in dont_include_list:
                str_list.append(build_str.strip())
        str_index += 1

    index = 0
    max_count = 0
    for i in range(0, len(str_list)):
        word_count = len(str_list[i].split())
        if word_count > max_count:
            max_count = word_count
            index = i

    if len(str_list) > 0:
        if str_list[index] not in dont_include_list:
            return str_list[index].strip()
    return None

# def search_dict(input_dict, search_term):
#     '''Searches for ingredient from search_term in dictionary'''
#     ret_str = ''
#     search_split = search_term.split()
#     str_index = 0
#     while str_index < len(search_split):
#         ret_str = ''
#         if search_split[str_index] in input_dict.keys():
#             ret_str += search_split[str_index]
#             next_index = str_index + 1
#             if next_index >= len(search_split):
#                 return ret_str.strip()
#             if search_split[next_index] in input_dict[search_split[str_index]]:
#                 ret_str += ' ' + search_split[next_index]
#                 dict_index = next_index
#                 next_index += 1
#                 if next_index >= len(search_split):
#                     return ret_str.strip()
#                 if search_split[next_index] in input_dict[search_split[dict_index]]:
#                     ret_str += ' ' + search_split[next_index]
#
#                 return ret_str.strip()
#             return ret_str.strip()
#         else:
#             str_index += 1
#
#     return None

def plural_to_singular(input_string):
    '''
    Converts passed in string to singular form if the word is plural
    '''
    edge_cases = ["molasses"]
    if input_string in edge_cases:
        return input_string
    str_in = list(input_string)
    if str_in[-1] == 's' and str_in[-2] != 's':
        if str_in[-2] == 'e':
            # if str_in[-3] == 'v':
            #     str_in[-3] = 'f'
            #     return "".join(str_in[:-1])
            if str_in[-3] == 'i':
                str_in[-3] = 'y'
                return "".join(str_in[:-2])
            if str_in[-3] == 'o':
                return "".join(str_in[:-2])
            if str_in[-3] == 'x' or str_in[-3] == 'z':
                return "".join(str_in[:-2])
            if len(str_in) > 4:
                if str_in[-4] == 'c' and str_in[-3] == 'h':
                    return "".join(str_in[:-2])
                if str_in[-4] == 's' and str_in[-3] == 'h':
                    return "".join(str_in[:-2])
            return "".join(str_in[:-1])
        return "".join(str_in[:-1])
    return input_string

def handle_special_characters(input_string):
    '''
    Removes special characters from the input_string and replaces them with normal characters if possible.
    '''
    input_string = input_string.replace('xc2xae','')
    input_string = input_string.replace('xc2xa9','')
    input_string = input_string.replace('xc2xe0','a')
    input_string = input_string.replace('xc2xe1','a')
    input_string = input_string.replace('xc2xe2','a')
    input_string = input_string.replace('xc2xe3','a')
    input_string = input_string.replace('xc2xe7','c')
    input_string = input_string.replace('xc2xe8','e')
    input_string = input_string.replace('xc2xe9','e')
    input_string = input_string.replace('xc2xea','e')
    input_string = input_string.replace('xc2xec','i')
    input_string = input_string.replace('xc2xed','i')
    input_string = input_string.replace('xc2xee','i')
    input_string = input_string.replace('xc2xef','i')
    input_string = input_string.replace('xc2xf0','o')
    input_string = input_string.replace('xc2xf1','n')
    input_string = input_string.replace('xc2xf2','o')
    input_string = input_string.replace('xc2xf3','o')
    input_string = input_string.replace('xc2xf4','o')
    input_string = input_string.replace('xc2xf5','o')
    input_string = input_string.replace('xc2xf6','o')
    input_string = input_string.replace('xc2xf9','u')
    input_string = input_string.replace('xc2xfa','u')
    input_string = input_string.replace('xc2xfb','u')
    input_string = input_string.replace('xc2xfc','u')
    return input_string
