import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularQueryModule, QueryClient } from 'angular-query';
import { AppComponent } from './app.component';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularQueryModule.forRoot(queryClient),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
