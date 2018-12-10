<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreateEvent;
use CodeShopping\Models\User;


class SendMailToDeFinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreateEvent  $event
     * @return void
     */
    public function handle(UserCreateEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);

        $user->sendPasswordResetNotification($token);
        //$user->notify(new Notification($token)); essse comando é utlizado para quando eu usar o meu proprio email de notificação
    }
}
