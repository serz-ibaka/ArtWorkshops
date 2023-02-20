import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-participant',
  templateUrl: './account-participant.component.html',
  styleUrls: ['./account-participant.component.css'],
})
export class AccountParticipantComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private likeService: LikeService,
    private commentService: CommentService,
    private messageService: MessageService,
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar
  ) {}

  username = localStorage.getItem('username') ?? '';
  workshops: any[] = [];

  displayedColumns: string[] = ['name', 'place', 'datetime'];
  participated: any = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.userService
      .getAppliedWorkshops(this.username)
      .subscribe((res: any) => {
        this.workshops = res['workshops'].filter(
          (x: any) => new Date(x.datetime).getTime() < Date.now()
        );
        this.participated = new MatTableDataSource(this.workshops);
      });
    this.userService.getActions(this.username).subscribe((res: any) => {
      this.comments = res['actions'].comments;
      this.likes = res['actions'].likes;
    });
    this.messageService
      .getUserChats({ username: this.username })
      .subscribe((res: any) => {
        this.chats = res['chats'];
      });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.participated.sort = this.sort;
  }

  datetimeFormat(dateString: any) {
    const date = new Date(dateString);
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDate = `${date.toLocaleDateString(
      'en-US',
      optionsDate
    )} ${date.toLocaleTimeString('en-US', optionsTime)}`;

    return formattedDate;
  }

  comments: any[] = [];
  likes: any[] = [];

  unlike(like: any) {
    this.likeService
      .unlikeWorkshop({
        username: this.username,
        workshop: like.id,
      })
      .subscribe((res: any) => {
        this._snackBar.open('Workshop unliked', 'Close');
        this.likes = this.likes.filter((l) => l._id != like._id);
      });
  }

  edit(comment: any) {
    this.commentService
      .editComment({
        content: comment.content,
        username: this.username,
        workshop: comment.id,
        datetime: comment.datetime,
      })
      .subscribe((res: any) => {
        this._snackBar.open('Comment edited', 'Close');
      });
  }

  deleteComment(comment: any) {
    this.commentService
      .deleteComment({
        username: this.username,
        workshop: comment.id,
        datetime: comment.datetime,
      })
      .subscribe((res: any) => {
        this._snackBar.open('Comment deleted', 'Close');
        this.comments = this.comments.filter((c) => c._id != comment._id);
      });
  }

  chats: any[] = [];
  openChats: any[] = [];

  openChat(chat: any) {
    this.openChats.push(chat);
  }
}
