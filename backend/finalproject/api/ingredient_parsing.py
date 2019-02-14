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
