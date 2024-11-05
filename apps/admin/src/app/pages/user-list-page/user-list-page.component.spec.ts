import { UserService } from '@/core/services/user.service';
import { TestBed } from '@angular/core/testing';
import { appConfig } from '../../app.config';
import { UserListPageComponent } from './user-list-page.component';

describe('UserListPageComponent', () => {
  it('should display title', () => {
    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        {
          provide: UserService,
          useValue: {
            getUsers: () => Promise.resolve([]),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(UserListPageComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Users');
  });
});
