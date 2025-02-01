import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from 'src/app/core/services/language.service';

import { Languages } from 'src/app/shared/enums/languages.enum';

import { languagesData } from 'src/app/shared/data/languages.data';

import { Options } from 'src/app/shared/interfaces/options.interface';

@Component({
  selector: 'app-language-change',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './language-change.component.html',
  styleUrl: './language-change.component.scss',
})
export class LanguageChangeComponent implements OnInit {
  public readonly languageOptions = languagesData;

  public languageSelected!: Options<Languages>;

  constructor(private readonly _languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageSelected = languagesData.find(
      (item) => item.value === this._languageService.languageSelected
    ) as Options<Languages>;
  }

  public onChangeLanguage(language: Options<Languages>) {
    this.languageSelected = language;
    this._languageService.changeLanguage(language.value);
  }
}
