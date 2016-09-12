<?php

namespace Victoire\Bundle\PageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Victoire\Bundle\CoreBundle\Entity\View;
use Victoire\Bundle\CoreBundle\Entity\WebViewInterface;

/**
 * Page.
 *
 * @ORM\Entity(repositoryClass="Victoire\Bundle\PageBundle\Repository\BasePageRepository")
 * @ORM\Table("vic_base_page")
 * @ORM\HasLifecycleCallbacks
 */
abstract class BasePage extends View implements WebViewInterface
{
    use \Victoire\Bundle\PageBundle\Entity\Traits\WebViewTrait;

    /**
     * Construct.
     **/
    public function __construct()
    {
        parent::__construct();
        $this->publishedAt = new \DateTime();
        $this->status = PageStatus::PUBLISHED;
        $this->homepage = false;
    }
}
