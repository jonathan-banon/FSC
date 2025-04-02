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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
final class UserController extends AbstractController
{
    private $manager;
    private $user;

    public function __construct(EntityManagerInterface $manager, UserRepository $user)
    {
        $this->manager = $manager;
        $this->user = $user;
    }

    #[Route('/api/userCreate', name: 'app_user', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return new JsonResponse(
                ['status' => false, 'message' => 'Requête invalide, JSON manquant'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(
                ['status' => false, 'message' => 'Email et mot de passe requis'],
                Response::HTTP_BAD_REQUEST
            );
        }

        if ($this->user->findOneBy(['email' => $email])) {
            return new JsonResponse(
                ['status' => false, 'message' => 'Cet email existe déjà'],
                Response::HTTP_CONFLICT
            );
        }

        $user = new User();
        $user->setEmail($email);

        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        $this->manager->persist($user);
        $this->manager->flush();

        return new JsonResponse(
            ['status' => true, 'message' => 'Utilisateur créé avec succès'],
            Response::HTTP_CREATED
        );
    }



    #[Route('/api/getAllUsers', name: 'get_allusers', methods: 'GET')]
    public function getAllUsers(): Response
    {
        $users = $this->user->findAll();

        return $this->json($users);
    }
}
