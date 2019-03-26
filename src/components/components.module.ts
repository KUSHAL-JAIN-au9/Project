import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { IonicModule } from "ionic-angular";

import { ChatBubbleComponent } from "./chat-bubble/chat-bubble";
import { ElasticTextareaComponent } from "./elastic-textarea/elastic-textarea";
import { TestCompComponent } from './test-comp/test-comp';

// import { PostCreatorPopoverComponent } from './post-creator-popover/post-creator-popover';
@NgModule({
  declarations: [ChatBubbleComponent, ElasticTextareaComponent,
    TestCompComponent,
],
  imports: [IonicModule],
  exports: [ChatBubbleComponent, ElasticTextareaComponent,
    TestCompComponent,
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
