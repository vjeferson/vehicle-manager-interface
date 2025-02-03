import { Injectable } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material/paginator';

import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class CustomMatPaginatorInt extends MatPaginatorIntl {
    private readonly LAST_PAGE_KEY_TRANSLATION = 'general.components.paginator.last-page-label';
    private readonly NEXT_PAGE_KEY_TRANSLATION = 'general.components.paginator.next-page-label';
    private readonly FIRST_PAGE_KEY_TRANSLATION = 'general.components.paginator.first-page-label';
    private readonly PREVIOUS_PAGE_KEY_TRANSLATION = 'general.components.paginator.previous-page-label';
    private readonly ITEMS_PER_PAGE_KEY_TRANSLATION = 'general.components.paginator.items-per-page-label';
    private readonly OF_KEY_TRANSLATION = 'general.components.paginator.of-label';

    private ofLabel = 'of';

    constructor(private readonly _translateService: TranslateService) {
        super();

        this._translateService.onLangChange
            .subscribe(() => {
                this.getAndInitTranslations();
            });

        this.getAndInitTranslations();
    }

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 ${this.ofLabel} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${this.ofLabel} ${length}`;
    };

    getAndInitTranslations() {
        this._translateService
            .get([
                this.LAST_PAGE_KEY_TRANSLATION,
                this.NEXT_PAGE_KEY_TRANSLATION,
                this.FIRST_PAGE_KEY_TRANSLATION,
                this.PREVIOUS_PAGE_KEY_TRANSLATION,
                this.ITEMS_PER_PAGE_KEY_TRANSLATION,
                this.OF_KEY_TRANSLATION,
            ])
            .subscribe((translation) => {
                this.lastPageLabel = translation[this.LAST_PAGE_KEY_TRANSLATION];
                this.nextPageLabel = translation[this.NEXT_PAGE_KEY_TRANSLATION];
                this.firstPageLabel = translation[this.FIRST_PAGE_KEY_TRANSLATION];
                this.previousPageLabel = translation[this.PREVIOUS_PAGE_KEY_TRANSLATION];
                this.itemsPerPageLabel = translation[this.ITEMS_PER_PAGE_KEY_TRANSLATION];
                this.ofLabel = translation[this.OF_KEY_TRANSLATION];
                this.changes.next();
            });
    }
}