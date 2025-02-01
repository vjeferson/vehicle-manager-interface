import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';

import { Languages, LocalStorageKeys } from 'src/app/shared/enums';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _languageSelected = Languages.PortugueseBrazil;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _translateService: TranslateService
  ) {
    if (isPlatformBrowser(this._platformId)) {
      const savedLang = localStorage.getItem(LocalStorageKeys.SystemLanguage);
      if (savedLang) {
        this._languageSelected = savedLang as Languages;
      }
      this._translateService.setDefaultLang(this._languageSelected);
      this._translateService.use(this._languageSelected);
    }
  }

  public get languageSelected(): Languages {
    return this._languageSelected;
  }

  public changeLanguage(language: string) {
    this._translateService.use(language);
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem(LocalStorageKeys.SystemLanguage, language);
    }
  }
}
