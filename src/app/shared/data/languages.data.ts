import { Languages } from 'src/app/shared/enums/languages.enum';

import { Options } from 'src/app/shared/interfaces/options.interface';

export const languagesData: Array<Options<Languages>> = [
  { name: 'general.components.language-options.en', value: Languages.EnglishUs },
  { name: 'general.components.language-options.pt',  value: Languages.PortugueseBrazil },
];
