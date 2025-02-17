import * as yup from 'yup';

export const nameSchema = yup
.string()
.trim()
.matches(/^[^=+\\/|[\]){}(*^%$#@!'"`~]+$/,'File/Folder name is not in correct format!')


