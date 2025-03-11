<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    private $manager;
    private $user;

    public function __construct(EntityManagerInterface $manager, UserRepository $user)
    {
        $this->manager = $manager;
        $this->user = $user;
    }

    #[Route('/userCreate', name: 'app_user', methods: 'POST')]
    public function index(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        if ($this->user->findOneBy(['email' => $email])) {
            return new JsonResponse(
                [
                    'status' => false,
                    'message' => 'Cet email existe déjà'
                ]
            );
        } else {
            $user = new User();
            $user->setEmail($email);
            $user->setPassword(sha1($password));

            $this->manager->persist($user);
            $this->manager->flush();

            return new JsonResponse(
                [
                    'status' => true,
                    'message' => 'Utilisateur créé avec succès'
                ]
            );
        }
    }


    #[Route('/getAllUsers', name: 'get_allusers', methods: 'GET')]
    public function getAllUsers(): Response
    {

        return new JsonResponse(
            [
                'status' => true,
                'users' => $this->user->findAll()
            ]
        );
    }
}
