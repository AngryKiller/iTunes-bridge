on encode(value)
	set type to class of value
	if type = integer or type = boolean then
		return value as text
	else if type = text then
		return encodeString(value)
	else if type = list then
		return encodeList(value)
	else if type = script then
		return value's toJson()
	else
		error "Unknown type " & type
	end if
end encode


on encodeList(value_list)
	set out_list to {}
	repeat with value in value_list
		copy encode(value) to end of out_list
	end repeat
	return "[" & join(out_list, ", ") & "]"
end encodeList


on encodeString(value)
	set rv to ""
	set codepoints to id of value
	
	if (class of codepoints) is not list then
		set codepoints to {codepoints}
	end if
	
	repeat with codepoint in codepoints
		set codepoint to codepoint as integer
		if codepoint = 34 then
			set quoted_ch to "\\\""
		else if codepoint = 92 then
			set quoted_ch to "\\\\"
		else if codepoint ³ 32 and codepoint < 127 then
			set quoted_ch to character id codepoint
		else
			set quoted_ch to "\\u" & hex4(codepoint)
		end if
		set rv to rv & quoted_ch
	end repeat
	return "\"" & rv & "\""
end encodeString


on join(value_list, delimiter)
	set original_delimiter to AppleScript's text item delimiters
	set AppleScript's text item delimiters to delimiter
	set rv to value_list as text
	set AppleScript's text item delimiters to original_delimiter
	return rv
end join


on hex4(n)
	set digit_list to "0123456789abcdef"
	set rv to ""
	repeat until length of rv = 4
		set digit to (n mod 16)
		set n to (n - digit) / 16 as integer
		set rv to (character (1 + digit) of digit_list) & rv
	end repeat
	return rv
end hex4


on createDictWith(item_pairs)
	set item_list to {}
	
	script Dict
		on setkv(key, value)
			copy {key, value} to end of item_list
		end setkv
		
		on toJson()
			set item_strings to {}
			repeat with kv in item_list
				set key_str to encodeString(item 1 of kv)
				set value_str to encode(item 2 of kv)
				copy key_str & ": " & value_str to end of item_strings
			end repeat
			return "{" & join(item_strings, ", ") & "}"
		end toJson
	end script
	
	repeat with pair in item_pairs
		Dict's setkv(item 1 of pair, item 2 of pair)
	end repeat
	
	return Dict
end createDictWith


on createDict()
	return createDictWith({})
end createDict

tell application "iTunes"
	set currentTrack to current track
	set playerState to the player state as string
	tell currentTrack
		set vname to name
		set vartist to album artist
		set valbum to album
		set vtime to (duration as integer)
		set vgenre to genre
		set vreleaseyear to year
		set vid to id
	end tell
	set velapsed to the (player position as integer)
	set vremaining to (vtime - velapsed)
end tell
set my_dict to createDictWith({{"name", vname}, {"artist", vartist}, {"album", valbum}, {"duration", vtime}, {"elapsedTime", velapsed}, {"remainingTime", vremaining}, {"genre", vgenre}, {"release_year", vreleaseyear}, {"id", vid}, {"playerState", playerState}})
return encode(my_dict)
