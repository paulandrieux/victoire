# MediaBundle
## Add Aviary image editor

This document describes how you can enable the Aviary image editor to the [VictoireMediaBundle][VictoireMediaBundle].

### Add Api Key to parameters.yml:

Register and get your Api Key on [http://www.aviary.com/](http://www.aviary.com/)

```yaml
    parameters:
      ...
      aviary_api_key: 'XXXXXXX'

```

Now you will get an "edit" button when you view an image.

[VictoireMediaBundle]: https://github.com/Victoire/VictoireMediaBundle "VictoireMediaBundle"

## Add media handler

This document describes how you can add a new media handlers to the [VictoireMediaBundle][VictoireMediaBundle].

### Create a MediaHandler

### Create a MediaHelper

### Add the mediahandler service:

```yaml
    service:
        ...
        pdf:
            default: false
            id: victoire_media.provider.pdf

```

[VictoireMediaBundle]: https://github.com/Victoire/VictoireMediaBundle "VictoireMediaBundle"

## MediaField

A field for media references. It has a "choose" button which opens a popup where you can select your media item from the media repository.

### Example Usage:

```php
$builder->add('ogImage', MediaType::class, array(
    'mediatype' => 'image',
    'label' => 'OG image'
));
```

### Options:

mediatype:
    type: string
    default: null
    description:
        You can specify a specific mediahandler by its name, when this is null all media items are possible.
        Knows possible values are: image|file|remotevideo|remoteslide

### Parent type:

form

### Class:

Victoire\Bundle\MediaBundle\Form\Type\MediaType

## Uploading Media in Your Code

Using the ```MediaCreatorService``` you can easily upload a media-asset to a Folder.

The API is straightforward:

```
    $mediaCreatorService = $this->container->get('victoire_media.media_creator_service');
    $media = $mediaCreatorService->createFile('./app/Content/Images/placeholder.jpg', 1, MediaCreatorService::CONTEXT_CONSOLE);
```

The path is relevant to the root of your Symfony project. The context can be either web or console.
You'll have to set this to console when you are calling the code from an environment outside of your webserver.
For example for a migration you would use the console context. Otherwise you can just omit the parameter
so the default web context is used.
