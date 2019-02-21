def search_dict(input_dict, search_term):
    '''Searches for ingredient from search_term in dictionary'''
    ret_str = ''
    search_split = search_term.split()
    str_index = 0
    while str_index < len(search_split):
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

def plural_to_singular(input_string):
    '''Converts passed in string to singular form if the word is plural'''
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
