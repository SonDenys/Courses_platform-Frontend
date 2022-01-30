



export function convert_to_i18n_format(aeonx_format_data) {
	const new_data = {}
	// for (let k in aeonx_format_data) {
	// 	const tdata = aeonx_format_data[k] || {}

	for (let key in aeonx_format_data) {
		const key_data = aeonx_format_data[key] // key = 818n key
		for (let lang in key_data) {
			const val = key_data[lang] || ""
			if (!val.length) {
				continue
			}

			if (new_data[lang] === undefined) {
				new_data[lang] = { "translation": {} }
			}

			new_data[lang].translation[key] = val
		}
	}
	// }

	return new_data

}
